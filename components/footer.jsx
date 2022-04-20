import Image from "next/image";
import LinkToMea from "./linkToMea";

export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="py-[3rem] px-10 bg-light-blue text-white font-montserrat"
    >
      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col columns-1 lg:columns-3 gap-x-10">
          <div className="w-full lg:mb-0 mb-30px">
            <div className="mb-[20px]">
              <Image
                src="https://storage.googleapis.com/smarketing-prod/others/logo-rebrand-ch-2_04_small.png"
                alt="logo"
                width={250}
                height={76.84}
              />
            </div>
            <p className="text-medium font-bold mb-[5px]">Media Sosial</p>
            <div className="flex gap-x-4 items-center">
              <a
                href="https://www.instagram.com/yohanagustian"
                rel="noopener noreferrer"
                target="_blank"
                className="mr-4"
                data-testid="footer-instagram-icon"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2.25098C15.8398 2.25098 16.2354 2.26562 17.5488 2.32422C18.7695 2.37793 19.4287 2.58301 19.8682 2.75391C20.4492 2.97852 20.8691 3.25195 21.3037 3.68652C21.7432 4.12598 22.0117 4.54102 22.2363 5.12207C22.4072 5.56152 22.6123 6.22559 22.666 7.44141C22.7246 8.75977 22.7393 9.15527 22.7393 12.4902C22.7393 15.8301 22.7246 16.2256 22.666 17.5391C22.6123 18.7598 22.4072 19.4189 22.2363 19.8584C22.0117 20.4395 21.7383 20.8594 21.3037 21.2939C20.8643 21.7334 20.4492 22.002 19.8682 22.2266C19.4287 22.3975 18.7646 22.6025 17.5488 22.6563C16.2305 22.7148 15.835 22.7295 12.5 22.7295C9.16016 22.7295 8.76465 22.7148 7.45117 22.6563C6.23047 22.6025 5.57129 22.3975 5.13184 22.2266C4.55078 22.002 4.13086 21.7285 3.69629 21.2939C3.25684 20.8545 2.98828 20.4395 2.76367 19.8584C2.59277 19.4189 2.3877 18.7549 2.33398 17.5391C2.27539 16.2207 2.26074 15.8252 2.26074 12.4902C2.26074 9.15039 2.27539 8.75488 2.33398 7.44141C2.3877 6.2207 2.59277 5.56152 2.76367 5.12207C2.98828 4.54102 3.26172 4.12109 3.69629 3.68652C4.13574 3.24707 4.55078 2.97852 5.13184 2.75391C5.57129 2.58301 6.23535 2.37793 7.45117 2.32422C8.76465 2.26562 9.16016 2.25098 12.5 2.25098ZM12.5 0C9.10645 0 8.68164 0.0146484 7.34863 0.0732422C6.02051 0.131836 5.10742 0.34668 4.31641 0.654297C3.49121 0.976563 2.79297 1.40137 2.09961 2.09961C1.40137 2.79297 0.976562 3.49121 0.654297 4.31152C0.34668 5.10742 0.131836 6.01563 0.0732422 7.34375C0.0146484 8.68164 0 9.10645 0 12.5C0 15.8936 0.0146484 16.3184 0.0732422 17.6514C0.131836 18.9795 0.34668 19.8926 0.654297 20.6836C0.976562 21.5088 1.40137 22.207 2.09961 22.9004C2.79297 23.5938 3.49121 24.0234 4.31152 24.3408C5.10742 24.6484 6.01562 24.8633 7.34375 24.9219C8.67676 24.9805 9.10156 24.9951 12.4951 24.9951C15.8887 24.9951 16.3135 24.9805 17.6465 24.9219C18.9746 24.8633 19.8877 24.6484 20.6787 24.3408C21.499 24.0234 22.1973 23.5938 22.8906 22.9004C23.584 22.207 24.0137 21.5088 24.3311 20.6885C24.6387 19.8926 24.8535 18.9844 24.9121 17.6563C24.9707 16.3232 24.9854 15.8984 24.9854 12.5049C24.9854 9.11133 24.9707 8.68652 24.9121 7.35352C24.8535 6.02539 24.6387 5.11231 24.3311 4.32129C24.0234 3.49121 23.5986 2.79297 22.9004 2.09961C22.207 1.40625 21.5088 0.976563 20.6885 0.65918C19.8926 0.351563 18.9844 0.136719 17.6563 0.078125C16.3184 0.0146484 15.8936 0 12.5 0Z"
                    fill="white"
                  ></path>
                  <path
                    d="M12.5 6.0791C8.95508 6.0791 6.0791 8.95508 6.0791 12.5C6.0791 16.0449 8.95508 18.9209 12.5 18.9209C16.0449 18.9209 18.9209 16.0449 18.9209 12.5C18.9209 8.95508 16.0449 6.0791 12.5 6.0791ZM12.5 16.665C10.2002 16.665 8.33496 14.7998 8.33496 12.5C8.33496 10.2002 10.2002 8.33496 12.5 8.33496C14.7998 8.33496 16.665 10.2002 16.665 12.5C16.665 14.7998 14.7998 16.665 12.5 16.665Z"
                    fill="white"
                  ></path>
                  <path
                    d="M20.6738 5.82508C20.6738 6.65515 20 7.3241 19.1748 7.3241C18.3447 7.3241 17.6758 6.65027 17.6758 5.82508C17.6758 4.995 18.3496 4.32605 19.1748 4.32605C20 4.32605 20.6738 4.99988 20.6738 5.82508Z"
                    fill="white"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/yohanagustian86"
                rel="noopener noreferrer"
                target="_blank"
                className="mr-4"
                data-testid="footer-facebook-icon"
              >
                <svg
                  data-testid="social-facebook-icon"
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1431_6568)">
                    <path
                      d="M25.7143 12.5C25.7143 5.59644 19.958 0 12.8571 0C5.75633 0 0 5.59644 0 12.5C0 18.739 4.70165 23.9104 10.8482 24.8481V16.1133H7.5837V12.5H10.8482V9.74609C10.8482 6.61328 12.7677 4.88281 15.7045 4.88281C17.1108 4.88281 18.5826 5.12695 18.5826 5.12695V8.20312H16.9614C15.3643 8.20312 14.8661 9.16675 14.8661 10.1562V12.5H18.4319L17.8619 16.1133H14.8661V24.8481C21.0126 23.9104 25.7143 18.739 25.7143 12.5Z"
                      fill="white"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1431_6568">
                      <rect width="25.7143" height="25" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@101bisnis"
                rel="noopener noreferrer"
                target="_blank"
                className="mr-4"
                data-testid="footer-tiktok-icon"
              >
                <svg
                  data-testid="social-tiktok-icon"
                  width="28"
                  height="25"
                  viewBox="0 0 28 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.1142 0H15.5179V17.029C15.5179 19.058 13.7502 20.7247 11.5503 20.7247C9.35035 20.7247 7.58257 19.058 7.58257 17.029C7.58257 15.0362 9.31107 13.4058 11.4324 13.3333V9.05799C6.7576 9.13042 2.98633 12.6449 2.98633 17.029C2.98633 21.4493 6.83616 25 11.5896 25C16.3429 25 20.1927 21.4131 20.1927 17.029V8.29708C21.9212 9.45653 24.0426 10.1449 26.2818 10.1812V5.9058C22.8248 5.7971 20.1142 3.1884 20.1142 0Z"
                    fill="white"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/c/yohanagustian"
                rel="noopener noreferrer"
                target="_blank"
                data-testid="footer-youtube-icon"
              >
                <svg
                  data-testid="social-youtube-icon"
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.302 8.76751C31.9455 7.44213 30.9005 6.39734 29.5753 6.04046C27.1543 5.37805 17.4703 5.37805 17.4703 5.37805C17.4703 5.37805 7.78668 5.37805 5.36573 6.01534C4.06603 6.37185 2.99556 7.44231 2.63906 8.76751C2.00195 11.1883 2.00195 16.2086 2.00195 16.2086C2.00195 16.2086 2.00195 21.2543 2.63906 23.6498C2.99594 24.9749 4.04053 26.0197 5.36591 26.3766C7.81217 27.0392 17.4707 27.0392 17.4707 27.0392C17.4707 27.0392 27.1543 27.0392 29.5753 26.4019C30.9007 26.0452 31.9455 25.0004 32.3023 23.6752C32.9393 21.2543 32.9393 16.2341 32.9393 16.2341C32.9393 16.2341 32.9648 11.1883 32.302 8.76751ZM14.3871 20.8466V11.5706L22.4399 16.2086L14.3871 20.8466Z"
                    fill="white"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="w-full lg:mb-0 mb-30px">
            <div className="text-medium font-bold mb-15px">Tentang Kami</div>
            <div className="flex lg:flex-row flex-col columns-1 lg:columns-2 justify-between">
              <div>
                <ul className="flex flex-col lg:mb-0 mb-15px">
                  <li className="mb-15px">
                    <LinkToMea id="jasa-kami" to="/jasa-kami">
                      Jasa Kami
                    </LinkToMea>
                  </li>
                  <li className="mb-15px">
                    <LinkToMea
                      id="partner-marketing-page"
                      to="/partner-marketing-page"
                    >
                      Jadi Partner
                    </LinkToMea>
                  </li>
                  <li className="mb-15px">
                    <LinkToMea
                      id="footer-terms-condition"
                      to="/term-and-condition"
                    >
                      Syarat &amp; Ketentuan
                    </LinkToMea>
                  </li>
                  <li>
                    <LinkToMea id="footer-privacy" to="/privacy">
                      Kebijakan Privasi
                    </LinkToMea>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="flex flex-col">
                  <li className="mb-15px">
                    <LinkToMea id="footer-disclaimer" to="/disclaimer">
                      Disclaimer
                    </LinkToMea>
                  </li>
                  <li className="mb-15px">
                    <LinkToMea
                      id="footer-verify-certificate"
                      to="/verifikasi-sertifikat"
                    >
                      Verifikasi Sertifikat
                    </LinkToMea>
                  </li>
                  <li>
                    <LinkToMea id="footer-karir" to="/karir">
                      Karir
                    </LinkToMea>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="text-medium font-bold mb-15px">Kontak</div>
            <div>
              <div
                className="flex contact"
                data-testid="footer-contact-wa"
                id="contact-whatsapp"
              >
                <Image
                  alt="phone"
                  src="https://storage.googleapis.com/smarketing-prod/others/phone-icon.svg"
                  width={25}
                  height={25}
                />
                <p className="ml-2 contact-description">+62 821-1793-2648</p>
              </div>
              <div
                className="mt-2 mb-15px contact"
                data-testid="footer-contact-map"
                id="location-map"
              >
                <div className="flex align-items-start">
                  <Image
                    alt="location"
                    src="https://storage.googleapis.com/smarketing-prod/others/location-icon.svg"
                    width={25}
                    height={25}
                  />
                  <div className="flex flex-col ml-2">
                    <div className="font-bold">Head Office</div>
                    <div
                      className="hover:font-bold cursor-pointer"
                      aria-label="head office"
                      href="https://www.google.com/maps/place/Head+Office+-+PT.+MEA+DIGITAL+MARKETING/@-6.9109447,107.5711236,17z/data=!3m1!4b1!4m5!3m4!1s0x2e68e53fab6eaad5:0x8e7d0423f13284a2!8m2!3d-6.91095!4d107.5733123?shorturl=1"
                      target="_blank"
                    >
                      Jl. Kasuari No.9, Maleber, Kec. Andir, Kota Bandung, Jawa
                      Barat 40184
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mt-2 pl-8 contact"
                data-testid="footer-contact-map2"
              >
                <div className="flex align-items-start">
                  <div className="flex flex-col">
                    <div className="font-bold">Branch Office</div>
                    <a
                      target="_blank"
                      aria-label="branch office"
                      href="https://www.google.com/maps/place/MEA+Digital+Marketing/@-6.9281223,107.5782768,15z/data=!4m5!3m4!1s0x0:0x229f726547b0ef72!8m2!3d-6.9281223!4d107.5782768?sa=X&ved=2ahUKEwiyw_z4ufjxAhUPWCsKHUOVDoYQ_BIwF3oECE0QBQ&shorturl=1"
                      className="hover:font-bold cursor-pointer"
                    >
                      Jl. Aki Padma Utara No.11, Babakan, Babakan Ciparay, Kota
                      Bandung, Jawa Barat 40222
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
