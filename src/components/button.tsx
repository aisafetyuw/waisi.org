import { ButtonProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const BRAND_ICONS = {
  discord: faDiscord,
  linkedin: faLinkedin,
  twitter: faTwitter,
  instagram: faInstagram,
} as const;

export default function Button(props: ButtonProps) {
  return (
    <a
      className="waisi-button"
      target={props.url.includes("https") ? "_blank" : "_self"}
      rel={props.url.includes("https") ? "noopener noreferrer" : undefined}
      href={props.url}
    >
      {props.fa && (
        <>
          <FontAwesomeIcon icon={BRAND_ICONS[props.fa]} aria-hidden="true" />
          &nbsp;
        </>
      )}
      {props.text}
    </a>
  );
}
