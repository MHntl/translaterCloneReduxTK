import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import Select from "react-select";
import { clearAnswer } from "./redux/slices/translateSlice";

function App() {
  const state = useSelector((store) => store.translateState);
  const dispatch = useDispatch();
  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);
    setText(" ");
    dispatch(clearAnswer());
  };
  const [text, setText] = useState();
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const refinedData = useMemo(() => {
    return state.languages.map((i) => ({
      value: i.code,
      label: i.name,
    }));
  }, [state.languages]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  return (
    <div id="main-page">
      <div className="container">
        <h1>Translator X</h1>
        {/* TOP */}
        <div className="upper">
          <Select
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={refinedData}
          />
          <button onClick={handleSwap}>Swap</button>
          <Select
            onChange={setTargetLang}
            isLoading={state.isLoading}
            value={targetLang}
            className="select"
            options={refinedData}
          />
        </div>
        {/* MİD */}
        <div className="center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a word..."
          ></textarea>
          <textarea
            className={state.isTextLoading ? "loading" : " "}
            value={state.answer}
            disabled
          ></textarea>
        </div>
        {/* BOT */}
        <button
          onClick={() => {
            dispatch(translateText({ sourceLang, targetLang, text }));
          }}
          id="translate-btn"
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
