import shareFacebook from "../assets/share-face.png"
export default function ShareButton({idRestaurant = ""}) {
  const link = encodeURI(`https://nfsedg.github.io/edt-interview/restaurant/${idRestaurant}`)
  console.log(window.location.href)
  console.log(`https://nfsedg.github.io/edt-interview/restaurant/${idRestaurant}`)
  return (
    <a href={`https://www.facebook.com/share.php?u=${link}`} target="_blank" rel="noreferrer"><img src={shareFacebook} width={94} /></a>
  )
}
