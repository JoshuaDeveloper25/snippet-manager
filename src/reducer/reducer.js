import { REDUCER_ACTIONS } from "./actions";
import { v4 as uuidv4 } from "uuid";

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTIONS.add_snippet:
      const eventSubmit = action.payload;

      const newSnippet = {
        title: eventSubmit.target.title.value,
        description: eventSubmit.target.description.value,
        code: eventSubmit.target.code.value,
        id: uuidv4(),
      };

      state.snippets.push(newSnippet);

      return { ...state };

    case REDUCER_ACTIONS.delete_snippet:
      const restOfSnippets = state?.snippets.filter(
        (snippet) => snippet.id !== action.payload
      );

      return { ...state, snippets: restOfSnippets };

    case REDUCER_ACTIONS.edit_snippet:
      const editedSnippetMap = state?.snippets?.map((snippet) =>
        snippet.id === action.payload.editObjectSnippet.id
          ? action.payload.editObjectSnippet
          : snippet
      );

      return { ...state, snippets: editedSnippetMap };

    case REDUCER_ACTIONS.all_snippets:
      return { ...state, snippets: action.payload };

    case REDUCER_ACTIONS.sign_out:
      return { ...state, snippets: [] };
  }
  return state;
};

export default reducer;
