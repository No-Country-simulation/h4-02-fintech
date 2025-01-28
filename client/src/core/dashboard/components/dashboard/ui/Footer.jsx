import { Instagram } from "iconsax-react";
import { Link } from "react-router-dom";

import iupiFooterImage from "../../../../../assets/images/iupi-footer.svg";
import sloganFooterImage from "../../../../../assets/images/slogan-footer.svg";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-2 px-2 fixed bottom-0 w-full hidden sm:block">
      <div className="container mx-auto">
        {/* Mobile View */}

        <div className="flex justify-between gap-4">
          <div className="flex justify-start items-center gap-4">
            <img
              src={iupiFooterImage}
              alt="iupi-desktop"
              className="w-16 max-w-24"
            />
            <img
              src={sloganFooterImage}
              alt="slogan-desktop"
              className="w-48 max-w-48"
            />
          </div>

          <div className="flex items-center gap-1">
            {/* Social Media Text */}
            <p className="text-sm text-gray-200">
              Seguinos en nuestras redes sociales:
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-1">
              <a
                href="https://www.linkedin.com/company/iupi-ahorro-inversiones/"
                target="_blank"
                className="btn btn-circle btn-ghost"
                aria-label="Visit our LinkedIn"
              >
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_459_3188)">
                    <path
                      d="M19.4075 0.253822H1.71721C0.869799 0.253822 0.18457 0.922833 0.18457 1.74997V19.5132C0.18457 20.3404 0.869799 21.0134 1.71721 21.0134H19.4075C20.2549 21.0134 20.9442 20.3404 20.9442 19.5173V1.74997C20.9442 0.922833 20.2549 0.253822 19.4075 0.253822ZM6.34352 17.9441H3.26202V8.03462H6.34352V17.9441ZM4.80277 6.68443C3.81345 6.68443 3.01469 5.88568 3.01469 4.90041C3.01469 3.91514 3.81345 3.11638 4.80277 3.11638C5.78804 3.11638 6.5868 3.91514 6.5868 4.90041C6.5868 5.88162 5.78804 6.68443 4.80277 6.68443ZM17.8748 17.9441H14.7974V13.1272C14.7974 11.9798 14.7771 10.4998 13.1958 10.4998C11.5942 10.4998 11.351 11.7527 11.351 13.0461V17.9441H8.27757V8.03462H11.2293V9.38886H11.2699C11.6794 8.61037 12.6849 7.78729 14.1811 7.78729C17.2991 7.78729 17.8748 9.83892 17.8748 12.5069V17.9441Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_459_3188">
                      <rect
                        width="20.7596"
                        height="20.7596"
                        fill="white"
                        transform="translate(0.18457 0.253822)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://x.com/iUpi_Ahorro_Inv"
                className="btn btn-circle btn-ghost"
                aria-label="Visit our Twitter"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3659 1.90067H19.2839L12.9089 9.18685L20.4085 19.1017H14.5364L9.93708 13.0884L4.67445 19.1017H1.75468L8.57335 11.3083L1.37891 1.90067H7.40015L11.5575 7.39706L16.3659 1.90067ZM15.3417 17.3551H16.9586L6.52157 3.5555H4.78648L15.3417 17.3551Z"
                    fill="white"
                  />
                </svg>
              </a>
              <Link
                href="https://www.instagram.com/iupi.ahorro.inversiones/"
                className="btn btn-circle btn-ghost"
                aria-label="Visit our Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
