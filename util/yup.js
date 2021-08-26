import * as Yup from "yup";

export const authSchema = Yup.object().shape({
  name: Yup.string()
    .required("必須項目です"),
  password: Yup.string().required("必須項目です").min(6, "6文字以上で入力してください"),
});