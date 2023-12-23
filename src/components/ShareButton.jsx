import shareFacebook from "../assets/share-face.png"
export default function ShareButton() {
  const link = encodeURI(window.location.href)

  return (
    <a href={`https://www.facebook.com/share.php?u=${link}`} target="_blank" rel="noreferrer"><img src={shareFacebook} width={94} /></a>
  )
}
