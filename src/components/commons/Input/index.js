import React, { useState } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function KarenInput(props) {
  const [isFocus, setFocus] = useState(false);
  const {
    placeholder,
    type,
    style,
    parentStyle,
    value,
    onChange,
    name,
    error
  } = props;

  return (
    <div
      style={parentStyle}
      className="custom-input"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <style jsx>
        {`
          .custom-input {
            position: relative;
            margin-top: 20px;
            width: 100%;
          }
          .custom-input .placeholder {
            position: absolute;
            left: 0;
            margin: 5px 10px;
            z-index: 1;
            color: #b2b2b2;
            transition: 0.2s ease;
            transform: ${isFocus || (value && value.length > 0)
              ? "scale(.75) translate(-13px, -35px)"
              : "none"};
            transform-origin: center left;
            pointer-events: none;
          }
        `}
      </style>
      <style jsx global>
        {`
          .karen-input {
            border-radius: 0;
            border: none;
            border-bottom: solid 2px #efefef;
            background: transparent;
            line-height: 1.75;
            box-shadow: none;
            width: 100%;
          }
          .karen-input.error {
            border-bottom: solid 2px var(--primaryColor) !important;
          }
          .karen-input:focus {
            box-shadow: none;
          }
          .errorText {
            color: var(--primaryColor);
            margin-top: -8px;
            text-transform: capitalize;
            font-size: 11px;
          }
        `}
      </style>
      <span className="placeholder">{placeholder}</span>
      {type === "password" ? (
        <Input.Password
          style={style}
          className={`karen-input ${error && "error"}`}
          onChange={onChange}
          value={value}
          name={name}
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
        />
      ) : (
        <Input
          style={style}
          onChange={onChange}
          value={value}
          name={name}
          className={`karen-input ${error && "error"}`}
        />
      )}
      {error && <p className="errorText">{error}</p>}
    </div>
  );
}
