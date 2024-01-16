import { FC, useEffect, useState } from "react";
import { Option, Select } from "./style/Search.style";
import axios from "axios";
import GenericInput from "Components/GenericInput/GenericInput.component";

interface SearchProps {
  api?: any;
  token?: any;
  getValue?: any;
  clickedOutside?: any;
  value?: any;
  onFocus?: () => void;
  onBlur?: () => void;
}
const Search: FC<SearchProps> = (props) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const getItems = async () => {
    try {
      const response = await axios.get(props.api, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
    props.getValue(event.target.value.toLowerCase());
  };

  const filteredItems = items?.filter(
    (item: any) =>
      item.listing?.toLowerCase().includes(searchTerm) ??
      item.source?.toLowerCase().includes(searchTerm)
  );
  const handleSelectItem = (selectedValue: any) => {
    setSearchTerm(selectedValue);
    setShowDropdown(false);
    props.getValue(searchTerm);
  };
  const selectSize =
    filteredItems.length <= 3 ? filteredItems.length : filteredItems.length / 7;

  const handleBlur = () => {
    if (!props.clickedOutside) {
      setShowDropdown(false);
    }
  };

  const textFieldValueHandler = () => {
    if (searchTerm.length === 0) {
      return props.value || "";
    } else {
      return searchTerm;
    }
  };
  useEffect(() => {
    if (!filteredItems.length) {
      setShowDropdown(false);
    } else if (searchTerm.length) {
      setShowDropdown(true);
    }
  }, [filteredItems]);
  // console.log(filteredItems.length);
  // console.log(searchTerm);
  return (
    <>
      <div>
        <GenericInput
          id="searchInput"
          type="text"
          placeholder="Search"
          onChange={handleSearchTermChange}
          value={textFieldValueHandler()}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
        />

        {props.clickedOutside && showDropdown && (
          <Select
            size={selectSize}
            onChange={handleSearchTermChange}
            value={searchTerm}
            multiple
            onBlur={handleBlur}
          >
            {filteredItems.map((result: any) => (
              <Option
                key={result.id}
                value={result.listing || result.source}
                onClick={() =>
                  handleSelectItem(result.listing || result.source)
                }
              >
                {result.listing || result.source}
              </Option>
            ))}
          </Select>
        )}
      </div>
    </>
  );
};

export default Search;
