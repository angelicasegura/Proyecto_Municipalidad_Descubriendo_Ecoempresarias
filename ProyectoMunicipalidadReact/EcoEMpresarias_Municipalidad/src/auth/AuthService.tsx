
import { type ForgotPasswordRequest, type ForgotPasswordResponse } from "../pages/auth/login/auth.types";

const API_URL = import.meta.env.VITE_API_URL || 'https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/auth/olvido-contrasena';


export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al enviar el correo de recuperación');
    }

    return response.json();
};





