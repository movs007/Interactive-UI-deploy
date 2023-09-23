"use client";
import { useState } from "react";
import Image from "next/image";
import bgCardFront from "../public/bgCardFront.png";
import bgCardBack from "../public/bg-card-back.png";
import cardLogo from "../public/card-logo.svg";
import tick from "../public/icon-complete.svg";

const Home = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [dateYY, setDateYY] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <main>
      <div className="left-side absolute -z-10 w-full">
        <picture>
          <source media="(min-width: 768px)" srcSet="bg-main-desktop.png" />
          <img
            src="bg-main-mobile.png"
            height={400}
            alt=""
            className="w-full md:w-1/3"
          />
        </picture>
      </div>

      <div className="main-container flex align-center">
        <div className="card-container flex lg:flex-col lg:ml-16 gap-4">
          <article className="front-card relative flex flex-col  justify-between">
            <div className="absolute -z-10 w-full">
              <Image
                src={bgCardFront}
                className="w-full"
                width={350}
                height={260}
              />
            </div>

            <Image
              src={cardLogo}
              className="w-16 lg:w-28 mt-2 p-2 lg:p-4"
              width={200}
              height={160}
            />

            <div className="p-2 lg:p-4">
              <h2 className="text-white text-xl lg:text-2xl mb-2 lg:mb-6 tracking-widest">
                {cardNumber}
              </h2>

              <ul className="flex items-center justify-between">
                <li className="text-white uppercase text-xs lg:text-xl tracking-widest">
                  {name}
                </li>
                <li className="text-white text-xs lg:text-xl tracking-widest">
                  {date}/{dateYY}
                </li>
              </ul>
            </div>
          </article>

          <article className="back-card relative lg:ml-10">
            <div className="absolute -z-10 w-full">
              <Image
                src={bgCardBack}
                className="w-full"
                width={350}
                height={260}
              />
            </div>
            <p className="absolute right-10 text-sm lg:text-xl text-white tracking-widest">
              {cvc}
            </p>
          </article>
        </div>
        <div className="right-side">
          <div className="form-container">
            {!confirmed && (
              <form className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen">
                <div>
                  <label htmlFor="cardholder_name">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder="e.g. Jane Appleseed"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="card_number">Card Number</label>
                  <input
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>

                <article className="flex items-center justify-between gap-8">
                  <div className="flex-1">
                    <label htmlFor="expiry_date">Exp. Date (MM/YY)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="expiry_date"
                        id="expiry_date"
                        placeholder="MM"
                        required
                        maxLength={2}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <input
                        type="text"
                        name="expiry_date"
                        id="expiry_date"
                        placeholder="YY"
                        required
                        maxLength={2}
                        value={dateYY}
                        onChange={(e) => setDateYY(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                  </div>
                </article>

                <button onClick={() => setConfirmed(true)} className="btn">
                  Confirm
                </button>
              </form>
            )}

            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto">
        <img src="icon-complete.svg" alt="" className="block mx-auto" />
        <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">
          Thank you!
        </h1>
        <p className="text-slate-400 text-center">
          We've added your card details
        </p>
        <button
          onClick={() => setConfirmed(false)}
          className="btn block mx-auto mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </>
  );
}
