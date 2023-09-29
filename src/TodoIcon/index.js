import { IoIosCheckmarkCircleOutline as CheckIcon} from "react-icons/io";
import { FiTrash2 as DeleteIcon} from "react-icons/fi";
import './TodoIcon.css';

const iconTypes  = {
  "check":(color)=><CheckIcon 
                      className="Icon-svg"
                      fill={color}
                  />,
  "delete":(color)=> <DeleteIcon 
                      className="Icon-svg"
                      fill={color}
                      />,
};

function TodoIcon({ type, color, onClick }){
  return (
    <span 
      className={`Icon-container Icon-container-${ type }`} 
      onClick={onClick}
    > 
      {iconTypes[type](color)}
    </span>
  )
}

export { TodoIcon }