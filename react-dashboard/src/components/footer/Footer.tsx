import { Link } from "react-router-dom";

export default function Footer() {

  const year = new Date().getFullYear();

  return (
    <footer className="border-top">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">

            {/* Footer Links */}
            <ul className="list-inline text-center text-responsive">

              <li className="list-inline-item">
                <Link to="/privacy">
                  Privacy Policy
                </Link>
              </li>

              <li className="list-inline-item text-responsive">
                <Link to="/terms">
                  Terms of Service
                </Link>
              </li>

              <li className="list-inline-item text-responsive">
                <Link to="/disclaimer">
                  Disclaimer
                </Link>
              </li>

              <li className="list-inline-item text-responsive">
                <Link to="/faq">
                  FAQ
                </Link>
              </li>

            </ul>

            {/* Copyright */}
            <div
              id="copy-right-label"
              className="small text-center text-muted fst-italic text-responsive"
            >
              &copy; {year} tansstash.com
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}