import type { Monaco } from "@monaco-editor/react";

export const GETC_EDITOR_THEME = "getc-code";

export function defineGetcEditorTheme(monaco: Monaco) {
  monaco.editor.defineTheme(GETC_EDITOR_THEME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "f5ede6" },
      { token: "comment", foreground: "8a7e74", fontStyle: "italic" },
      { token: "keyword", foreground: "7dd3c0" },
      { token: "keyword.directive", foreground: "8ec8d8" },
      { token: "keyword.directive.include", foreground: "8ec8d8" },
      { token: "string", foreground: "f0c674" },
      { token: "string.escape", foreground: "f5a97f" },
      { token: "number", foreground: "f5a97f" },
      { token: "number.hex", foreground: "f5a97f" },
      { token: "number.float", foreground: "f5a97f" },
      { token: "type", foreground: "9ecbff" },
      { token: "identifier", foreground: "f5ede6" },
      { token: "delimiter", foreground: "c4b8ae" },
      { token: "delimiter.bracket", foreground: "c4b8ae" },
    ],
    colors: {
      "editor.background": "#00000000",
      "editor.foreground": "#f5ede6",
      "editorLineNumber.foreground": "#6b5e54",
      "editorLineNumber.activeForeground": "#d6c3b7",
      "editorCursor.foreground": "#ff8a1f",
      "editor.selectionBackground": "#ff8a1f40",
      "editor.inactiveSelectionBackground": "#ff8a1f24",
      "editor.lineHighlightBackground": "#ffffff0a",
      "editor.lineHighlightBorder": "#00000000",
      "editorIndentGuide.background1": "#ffffff14",
      "editorIndentGuide.activeBackground1": "#ffffff28",
      "editorGutter.background": "#00000000",
      "editorWidget.background": "#1c1814",
      "editorWidget.border": "#ff8a1f40",
      "editorSuggestWidget.background": "#1c1814",
      "editorSuggestWidget.border": "#ff8a1f40",
      "editorSuggestWidget.selectedBackground": "#ff8a1f24",
      "focusBorder": "#00000000",
      "scrollbarSlider.background": "#ffffff1f",
      "scrollbarSlider.hoverBackground": "#ffffff33",
      "scrollbarSlider.activeBackground": "#ff8a1f66",
    },
  });
}
