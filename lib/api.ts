import axios, {type AxiosResponse} from 'axios';
import {Note, NoteFormData} from "@/types/note";


// HTTP Request Parameters Interfaces
export interface NoteSearchParams {
    search?: string;
    tagIds?: string[];
}

export interface FetchNotesParams extends NoteSearchParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const notesEndpoint = `${API_BASE_URL}/notes`;
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const notesApi = axios.create({
        baseURL: notesEndpoint,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
);

// HTTP Request Functions
export const fetchNotes = async (
    params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
    const requestParams: Record<string, string | number | undefined> = {
        page: params.page,
        perPage: params.perPage,
        search: params.search,
    };

    const response: AxiosResponse<FetchNotesResponse> = await notesApi.get("", {params: requestParams,});
    return response.data;
};

export const createNote = async (note: NoteFormData): Promise<Note> => {
    const response: AxiosResponse<Note> = await notesApi.post("", note);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response: AxiosResponse<Note> = await notesApi.delete(`/${id}`);
    return response.data;
};

