import { useState, useEffect } from "react";

import api from "../api/axios";
import useMeta from "../hooks/useMeta";

import type { Contact } from "../schemas/contactSchema"

import { useNavigate, Link } from "react-router-dom";

export default function Inbox() {

    useMeta({
        title: "Inbox | Tan's Stash",
        description: "Welcome to Tan's Stash dashboard"
    });

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get(`/admin-get-contacts?page=${page}`);

                const data = response.data;

                // Defensive fallback
                setContacts(Array.isArray(data.posts) ? data.posts : []);
                setTotalPages(data.total_pages ?? 1);

            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts.");
                setContacts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [page]);

    // Delete handler
    function handleDelete(contactId: Number) {
        if (!confirm("Do you want to delete this blog?")) {
            return;
        }
        alert(`Contact id ${contactId} is deleted.`)

        navigate(-1); // goes to previous page
    }

    return (
        <>
            {/* <!-- Page Header--> */}
            <header
                className="masthead"
                style={{
                    backgroundImage: "url('/assets/img/home-bg.jpg')"
                }}
            >
                {/* <!-- <header className="masthead" style="background-image: url('{{url_for('static', path='assets/img/home-bg.jpg')}} ')"></header> --> */}
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                {/* <!-- i am using the config.json file to get these values and using it here by jinjer templating --> */}
                                <h1>Inbox</h1>
                                <h2 className="subheading">Check your customers messages.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* // <!-- Main Content--> */}
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">

                        {/* // <!-- Post preview-->
                        // <!--Todo: fetch it using for loop from the database-->
                        // <!-- variable "posts" is passed in def home() --> */}
                        {/* {% for contact in contacts %} <!--for loop in jinga--> */}
                        {loading ? (
                            <div className="post-preview">
                                Loading contacts...
                            </div>
                        ) : error ? (
                            <div className="post-preview">
                                {error}
                            </div>
                        ) : contacts.length === 0 ? (
                            <div className="post-preview">
                                No contacts found.
                            </div>
                        ) : (contacts.map((contact: Contact) => (
                            <div className="d-flex justify-content-between" key={contact.sno}>
                                <div className="post-preview">
                                    <Link to={`/dashboard/inbox/${contact.sno}`}>
                                        <h2 className="post-title">{contact.name}</h2>
                                        <h3 className="post-subtitle">{contact.msg}</h3>
                                    </Link>

                                    <p className="post-meta">
                                        Posted on {contact.date}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(contact.sno)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                        )}


                        <hr className="my-4" />
                        {/* // <!-- Pager--> */}

                        {/* // <!-- <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div> --> */}
                        <div className="d-flex justify-content-between mb-4">

                            {/* Previous Button */}
                            <div
                                className={`btn btn-primary text-uppercase nav-button ${page === 1 ? "disabled" : ""}`}
                                onClick={() => page > 1 && setPage(page - 1)}
                                style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
                            >
                                ← Previous
                            </div>

                            {/* Next Button */}
                            <div
                                className={`btn btn-primary text-uppercase nav-button ${page === totalPages ? "disabled" : ""}`}
                                onClick={() => page < totalPages && setPage(page + 1)}
                                style={{ cursor: page === totalPages ? "not-allowed" : "pointer" }}
                            >
                                Older Posts →
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}