// import type { contactSchema } from "../schemas/contactSchema";

import api from "@/api/axios";

export const fetchAContact = async (id: number) => {
    try {
        const response = await api.get(`/read-the-contact/${id}`);
        return response.data;
    }
    catch (error: any) {
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Failed to fetch blog.";

        throw new Error(message);
    }

}

export const deleteAContact = async (id: number) => {
    try {
        const response = await api.delete(`/delete-contact/${id}`);
        return response.data;
    }
    catch (error: any) {
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Failed to delete message.";

        throw new Error(message);
    }
}