import { Rating } from "flowbite-react";
import Phone from "../assets/Phone";
import Mail from "../assets/Mail";
import Globe from "../assets/Globe";

export default function Card({ restaurant }) {
  const { name, contact, address, rating } = restaurant;
  const ratingStars = new Array(Number(rating)).fill(null);
  const emptyStars = new Array(Number(5 - rating)).fill(null);
  return (
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
        <a className="flex gap-2" href="#">
          <Globe /> {contact.site}
        </a>
        <p className="flex gap-2 font-normal text-gray-700 dark:text-gray-400">
          <Mail /> {contact.email}
        </p>
        <p className="flex gap-2">
          <Phone /> {contact.phone}
        </p>
      </div>
    </div>
  );
}
