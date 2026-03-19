import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// --- schemas --- //
import type { Contact } from "../schemas/contactSchema";

//--- services ---//
import { fetchAContact } from "../services/inboxService";

type Params = {
  id: string;
};

export default function InboxMsgPage() {
  const { id } = useParams<Params>();
  const numericId = Number(id);

  const [contact, setContact] = useState<Contact>({
    sno: 0,
    name: "",
    msg: "",
    date: "",
    email: "",
    phone_no: "",
  });

  // fetch contact details
  useEffect(() => {
    if (!numericId) return;

    const fetchData = async () => {
      try {
        const data = await fetchAContact(numericId);
        setContact(data);
      } catch (error: any) {
        console.error("Error fetching contact:", error);
        toast.error(error.message);
      }
    };

    fetchData();
  }, [numericId]);

  return (
    <>
      <header className="masthead">
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="contact-heading">
                <h1>{contact.name}</h1>
                <span className="meta">
                  contacted on {contact.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <strong>Email: </strong> {contact.email} <br />
              <strong>Phone no: </strong> {contact.phone_no} <br />
              <strong>Message: </strong>
              <br />
              {contact.msg}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}