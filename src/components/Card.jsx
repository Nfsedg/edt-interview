import { Rating } from "flowbite-react";
import Phone from "../assets/Phone";
import Mail from "../assets/Mail";
import Globe from "../assets/Globe";
import ShareButton from "./ShareButton";
import { Helmet } from "react-helmet";

export default function Card({ restaurant }) {
  const { name, contact, address, rating } = restaurant;
  const ratingStars = new Array(Number(rating)).fill(null);
  const emptyStars = new Array(Number(4 - rating)).fill(null);
  return (
    <div>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={address} />
        <meta
          property="og:image"
          content="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mealnj.com%2F&psig=AOvVaw1eT7TFnsEjLdU6CGs0Rnhh&ust=1703393825556000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCD59TipIMDFQAAAAAdAAAAABAD"
        />
        {/* Add more meta tags as needed */}
      </Helmet>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5 grid gap-2">
          <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h4>
          <div className="mb-2 flex justify-center w-full">
            <div>
              <Rating>
                {ratingStars.map((_, i) => (
                  <Rating.Star key={i} />
                ))}
                {emptyStars.map((_, i) => (
                  <Rating.Star key={i} filled={false} />
                ))}
              </Rating>
            </div>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            St. {address.street}, {address.city}, {address.state}
          </p>
          <a
            className="flex gap-2 underline"
            style={{ color: "#1a56db" }}
            href="#"
          >
            <Globe /> {contact.site}
          </a>
          <p className="flex gap-2 font-normal text-gray-700 dark:text-gray-400">
            <Mail /> {contact.email}
          </p>
          <p className="flex gap-2">
            <Phone /> {contact.phone}
          </p>
          <div className="mt-4 flex w-full justify-end">
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
}
