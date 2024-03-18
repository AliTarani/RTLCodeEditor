import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RTLcodeEditor';
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: 'dummy-light',
    language: 'dummy',
    minimap: { enabled: false },

    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    scrollbar: {
      vertical: 'hidden',
    },
    overviewRulerBorder: false,
    lineNumbers: 'off',
    glyphMargin: false,

    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
  };
  code: string = 'متن اول دوم نوشته سوم';
}
