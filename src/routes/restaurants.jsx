import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getRestaurantsById } from "../services/restaurants";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Restaurants() {
  const [restaruant, setRestaurant] = useState();
  let { restId } = useParams();

  useEffect(() => {
    getRestaurantsById(restId)
      .then((data) => data.json())
      .then((item) => setRestaurant(item));
  }, [restId]);

  return (
    <div>
      {restaruant ? (
        <>
          <Helmet>
            <meta
              property="image"
              content="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mealnj.com%2F&psig=AOvVaw1eT7TFnsEjLdU6CGs0Rnhh&ust=1703393825556000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCD59TipIMDFQAAAAAdAAAAABAD"
            />
            <meta
              property="og:image"
              content="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mealnj.com%2F&psig=AOvVaw1eT7TFnsEjLdU6CGs0Rnhh&ust=1703393825556000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCD59TipIMDFQAAAAAdAAAAABAD"
            />
            <meta
              name="description"
              content={`${restaruant.address.street}, ${restaruant.address.city}, ${restaruant.address.state}`}
            />
            <meta property="og:title" content={`Melp | ${restaruant.name}`} />
            <meta
              property="og:description"
              content={`${restaruant.address.street}, ${restaruant.address.city}, ${restaruant.address.state}`}
            />
            <title>Melp | {restaruant.name}</title>
          </Helmet>
          <section>
            <Card restaurant={restaruant} />
          </section>
        </>
      ) : <div>
          <h2>No such restaurant information</h2>
        </div>}
    </div>
  );
}
