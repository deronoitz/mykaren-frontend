import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { query } = router;
  const handleSearch = () => {
    if (search.length > 0) {
      router.push({
        pathname: "/catalog",
        query: {
          search
        }
      });
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    if (query.search?.length > 0) {
      setSearch(query.search);
    }
    if (!query.search) {
      setSearch("");
    }
  }, [query]);
  return (
    <div className="search-wrapper">
      <style jsx>
        {`
          .search-wrapper {
            background: #f5f5f5;
            padding: 10px 0;
            margin-bottom: 40px;
          }
          .input-wrapper {
            max-width: 550px;
            margin: 0 auto;
            padding: 10px 20px;
            height: 60px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
            transform: translate3d(0, 40px, 0);
          }
          .filter {
            font-weight: 500;
            color: var(--titleColor);
            border-left: solid 2px #e8e8e8;
            padding-left: 20px;
            height: 100%;
          }
        `}
      </style>
      <div className="container">
        <div className="input-wrapper f mdl">
          <Input
            allowClear
            prefix={
              <SearchOutlined
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={handleSearch}
              />
            }
            placeholder="Search product..."
            className="search-input"
            onKeyDown={handleEnter}
            onChange={handleInputChange}
            value={search}
          />
          {/* <Dropdown overlay={<div>asd</div>}>
            <a className='f mdl filter'>
              Product
              <DownOutlined style={{ marginLeft: 20}} />  
            </a>
          </Dropdown> */}
        </div>
      </div>
    </div>
  );
}
