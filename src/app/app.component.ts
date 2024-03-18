import { Component } from '@angular/core';
import { MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { Subscription, filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => isLoaded),
        take(1)
      )
      .subscribe((res) => {
        this.tokenize();
        this.setTheme();

        this.completionProvider =
          monaco.languages.registerCompletionItemProvider('custom', {
            triggerCharacters: ['.', ' '],
            provideCompletionItems: (model, position) => {
              var word = model.getWordUntilPosition(position);
              var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
              };
              return {
                suggestions: [
                  {
                    label: 'متن ساده',
                    kind: monaco.languages.CompletionItemKind.Text,
                    range,
                    insertText: 'متن اول دوم',
                  },
                  {
                    range,
                    label: 'اگر',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'اگر ',
                  },
                  {
                    range,
                    label: 'شروع',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'شروع ',
                  },
                  {
                    range,
                    label: 'سن',
                    kind: monaco.languages.CompletionItemKind.Variable,
                    insertText: '@سن ',
                  },
                ],
              };
            },
          });
        monaco.languages.register({
          id: 'custom',
        });
        monaco.editor.setTheme('custom-light');
      });
  }
  subscription: Subscription = new Subscription();
  title = 'RTLcodeEditor';
  completionProvider: any;
  editor: any;
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: 'custom-light',
    language: 'custom',
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
  code: string = 'اگر 4 = 5 آنگاه ';

  editorInit(editor: any) {
    this.editor = editor;
  }

  tokenize() {
    monaco.languages.setMonarchTokensProvider('custom', {
      tokenizer: {
        root: [
          [
            /@[\u0600-\u06ff\u0750-\u077f\ufb50-\ufc3f\ufe70-\ufefc1-9a-zA-Z0-9]+/,
            'Variable',
          ],
          [
            /اگر\s |آنگاه\s|درغيراينصورت\s|و\s|یا\s|شروع|پایان||||||||||||||||  /,
            'keyword',
          ],
          [/#|=|>|<|\+|-|\*|\/|,|<>|<=|>=|\^|%/, 'Operator'],
        ],
      },
    });
  }

  setTheme() {
    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#fafafa',
        'editor.foreground': '#383a42',
      },
      rules: [
        { token: 'Variable', foreground: 'a836a6' },
        { token: 'Keyword', foreground: '447bef' },
        { token: 'Operator', foreground: 'a836a6' },
      ],
    });
  }

  ngOnDestroy(): void {
    if (this.completionProvider) this.completionProvider.dispose();
    if (this.editor) {
      this.editor.dispose();
      this.editor = undefined;
    }
    this.subscription.unsubscribe();
  }
}
