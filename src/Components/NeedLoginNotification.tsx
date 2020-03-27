import { notification } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN } from "../LocalQueries";
import { useHistory } from "react-router-dom";
import routes from "../Routes/routes";

const NeedLoginNotification = () => {
  const { data: { auth: { isLoggedIn = false } = {} } = {} } = useQuery(
    IS_LOGGED_IN
  );
  const history = useHistory();
  if (!isLoggedIn) {
    notification.error({
      message: "로그인 해주세요",
      description: "회원전용 페이지 입니다"
    });
    history.push(routes.HOME);
  }
};

export default NeedLoginNotification;
