import { JoinButtonProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function JoinButton(props: JoinButtonProps) {
  return (
    <a className="join-button" href={props.url}>
      {props.fa && <FontAwesomeIcon icon={['fab', props.fa]} />}
      {props.text}
    </a>
  );
}