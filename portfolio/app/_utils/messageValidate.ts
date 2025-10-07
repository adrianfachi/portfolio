import * as Yup from "yup";

export const messageValidateSchema = Yup.object().shape({
	name: Yup.string().required("Nome é obrigatório"),
	email: Yup.string().required("Email obrigatório")
		.email("Email inválido")
		.matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email inválido")
		,
	message: Yup.string()
		.required("Mensagem é obrigatória")
		.min(10, "Mensagem deve conter no mínimo 10 caracteres"),
});
