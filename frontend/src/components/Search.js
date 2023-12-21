import Icon from "./icons/Icon"
import { BsSearch } from "react-icons/bs";
import { BsFilterSquare } from "react-icons/bs";


const Search = () => {
    return (
        <div className="search">
            <div className="form-container">
                <form>
                    <input type="text" placeholder="Search" />
                </form>
                <button type="submit">
                    <Icon icon={BsSearch} className="icon" />
                </button>
                <button type="submit">
                    <Icon icon={BsFilterSquare} className="icon" />
                </button>

            </div>
        </div>
    );
}

export default Search;