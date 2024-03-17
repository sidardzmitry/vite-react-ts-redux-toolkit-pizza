import { InputHTMLAttributes } from 'react';
import styles from './Search.module.scss';
import {Search} from 'lucide-react';

interface SearchComponentProps extends InputHTMLAttributes<HTMLInputElement>{
  isValid: boolean,
  placeholder: string,
}

export const SearchComponent = ({ isValid = true, className, ...props}: SearchComponentProps) => {
  return (
    <div className={`${styles['search']}`}>
      <Search size={16} className={`${styles['search__icon']}`} />
      <input className={`${styles['input']} ${isValid ? styles['invalid'] : ''} ${className}`} {...props} />
    </div>
  )
};
