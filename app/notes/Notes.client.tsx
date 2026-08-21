"use client"

import css from "./Notes.module.css";
import {useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes} from "@/lib/api";
import {useDebouncedCallback} from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

const PER_PAGE = 12;
const NotesClient = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data, isLoading, isError} = useQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes({page, perPage: PER_PAGE, search}),
        placeholderData: keepPreviousData,
    });

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;


    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch}/>
                {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />}
                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>
            <main className={css.main}>
                {isLoading && <Loader/>}
                {isError && <ErrorMessage message="Something went wrong while fetching notes. Please try again later."/>}
                {!isLoading && !isError && notes.length === 0 && <p className={css.empty}>No notes found.</p>}
                {!isLoading && !isError && <NoteList notes={notes}/>}
            </main>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onSuccessSubmit={() => setIsModalOpen(false)}/>
                </Modal>
            )}
        </div>
    );
};

export default NotesClient;
