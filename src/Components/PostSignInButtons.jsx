import React from "react";
import Button from "./Button";
import useNavigation from "../hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../features/login";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { nanoid } from "nanoid";
import { setAllScheduleList, setEventId } from "../features/adminSchedule";
import { doc, getDoc } from "firebase/firestore";

const PostSignInButtons = () => {
  const addCss = "w-64";
  const { openEditSchedulePage } = useNavigation();
  const { openTimeManagementPage } = useNavigation();
  const { name } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const adminID = sessionStorage.getItem("adminID");

  //ログアウトボタンを押した時の処理
  const handleLogOut = () => {
    signOut(auth).then(() => {
      //ログアウト成功
      dispatch(setLogout());
      sessionStorage.setItem("isAuth", false);
    });
  };

  //日程調整開始ページに飛ぶ
  const onClickToEditSchedulePage = () => {
    const ID = nanoid();
    dispatch(setEventId(ID));
    console.log("nanoID", ID);
    openEditSchedulePage();
  };

  //スケジュール管理画面へ飛ぶ
  const onClickToTimeManagementPage = () => {
    //DBからこのユーザーのスケジュール情報を全て抽出する
    // idにアクセスがあった時に、fireStoreからデータを取得する。
    const getAdminDB = async (id) => {
      try {
        const docRef = doc(db, "admin", id); //adminコレクションからデータを取得する
        const docSnap = await getDoc(docRef);

        const allEventData = docSnap.data().events;
        // console.log(allEventData);
        //ここでタイムスタンプをreduxに保管するために一度処理を入れる
        const modifiedAllEventData = allEventData.map((data) => ({
          ...data, //スプレッド構文でタイムスタンプ以外の箇所はそのままでcreatedDateだけをtoISOString変換
          createdDate:
            data.createdDate && typeof data.createdDate.toDate === "function"
              ? data.createdDate.toDate().toISOString() //firestoreのタイムスタンプはDate型に一度変換しないとtoISOStringにできない
              : data.createdDate, //すでにDate型に変換されていたのものでればそのままｍ
        }));

        dispatch(setAllScheduleList(modifiedAllEventData));
        // sessionStorage.setItem("adminEvent", modifiedAllEventData);
        openTimeManagementPage();

        console.log("管理者の情報を取得しました");
      } catch (error) {
        console.log("管理者の情報を取得できてない", error);
      }
    };
    console.log("adminID", adminID);
    getAdminDB(adminID);
  };

  return (
    <div className="  bg-white flex w-2/4 flex-col items-center justify-around h-3/4 ">
      <p className="text-black font-bold text-2xl">ようこそ{name}様</p>
      <Button
        text={"新たに日程調整を始まる"}
        addCss={addCss}
        onClickFunc={onClickToEditSchedulePage}
      />
      <Button
        text={"日程調整の確認"}
        addCss={addCss}
        onClickFunc={onClickToTimeManagementPage}
      />
      <Button text={"ログアウト"} addCss={addCss} onClickFunc={handleLogOut} />
    </div>
  );
};

export default PostSignInButtons;
