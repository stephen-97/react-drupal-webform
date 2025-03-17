import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

const config = [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        project: "./tsconfig.json", // Spécifiez le chemin vers votre fichier tsconfig.json
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier,
    },
    rules: {
      // Règles Prettier
      "prettier/prettier": [
        "warn",
        {
          camelcase: true,
          singleQuote: true,
          trailingComma: "es5",
          tabWidth: 2,
          semi: false,
          bracketSpacing: true,
        },
      ],

      // Règles de base ESLint
      "no-console": "warn", // Évitez d'utiliser console.log() dans le code de production
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Avertir sur les variables non utilisées, mais ignorer les variables dont le nom commence par _
      "no-debugger": "warn", // Évitez d'utiliser debugger dans le code de production
      "no-restricted-syntax": ["error", "WithStatement"], // Évitez l'utilisation de 'with' statement
      "prefer-const": "warn", // Préférez 'const' pour les variables qui ne sont jamais réassignées

      // Règles React
      "react/jsx-key": "warn", // Assurez-vous que chaque élément JSX a une clé unique

      // Règles TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off", // Désactivez l'exigence de définir explicitement les types des fonctions de module
      "@typescript-eslint/explicit-function-return-type": "off", // Désactivez l'exigence de définir explicitement les types de retour des fonctions

      // Autres règles utiles
      "consistent-return": "warn", // Assurez-vous que toutes les branches d'une fonction renvoient une valeur ou aucune
      "no-implicit-coercion": "warn", // Évitez les conversions implicites (par exemple, `!!foo` pour convertir en booléen)
      "no-ternary": "off", // Permet les opérateurs ternaires (par défaut ils sont désactivés car certains préfèrent les if/else)
      "prefer-template": "warn", // Préférez les templates string aux concaténations de chaînes de caractères
      "no-else-return": ["warn", { allowElseIf: false }], // Évitez les 'else' après un 'return'
      "import/prefer-default-export": "off", // Désactivez la préférence pour l'exportation par défaut si un seul export est présent
    },

    ignores: [
      ".ddev",
      ".idea",
      ".next",
      ".vscode",
      "cron",
      "node_modules",
      "patches",
      "public",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default config;
