import { ButtonProps } from '@/types';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function Button(props: ButtonProps) {
  return (
    <a
      className="waisi-button"
      target={props.url.includes("https") ? "_blank" : "_self"}
      href={props.url}
      style={{fontFamily: '"Lora", serif'}}
    >
      {props.fa && <><i className={'fa-brands fa-' + props.fa}></i>&nbsp;</>}
      {props.text}
    </a>
  );
}