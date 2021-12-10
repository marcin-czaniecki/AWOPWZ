import { IInstructionProps } from "types/componentTypes";

export const instructionPinProject: IInstructionProps = {
  introduction: `W tym miejscu będziesz miał/a dostęp do przypiętych projektów w formie tablicy kanban. Ta funkcja ma pozwolić na szybkie uzyskanie dostępu do najważniejszych projektów, nad którymi aktualnie pracujesz.`,
  title: `Instrukcja przypięcia projektu`,
  steps: [
    `Otwórz nawigacje w lewym górnym rogu.`,
    `Kliknij link o nazwie Projekty.`,
    `Jeżeli nie ma żadnych projektów możesz je dodać otwierając w prawym dolnym rogu formularz i wypełnij go.`,
    `Kliknij na trzy kropki nad kartą projektu (kebab menu) i wybierz przypnij.`,
    `Teraz możesz się cieszyć z szybkiego dostępu do wybranego projektu.`,
  ],
};

export const instructionCreateTeams: IInstructionProps = {
  introduction: `W tym miejscu masz dostęp do zespołów, do których należysz. Jeżeli jesteś administratorem, możesz utworzyć nowy zespół, podążając za instrukcją.`,
  title: `Instrukcja utworzenia zespółu`,
  steps: [
    `Otwórz formularz w prawym dolnym rogu.`,
    `Wprowadź nazwę zespołu.`,
    `Potwierdź utworzenie zespołu za pomocą przycisku "Dodaj zespoł".`,
    `Teraz możesz przejść do zarządzania nowym zespołem, klikając w jego kartę.`,
  ],
};

export const instructionCreateProjects: IInstructionProps = {
  introduction: `W tym miejscu masz dostęp do projektów, które są dostępne dla zespołów, do których należysz. Jeżeli masz odpowiednie uprawnienia, możesz utworzyć nowy projekt dla konkretnego zespołu.`,
  title: `Instrukcja utworzenia projektu`,
  steps: [
    `Otwórz formularz w prawym dolnym rogu.`,
    `Wprowadź nazwę projektu.`,
    `Wybierz zespół, dla którego chcesz utworzyć projekt.`,
    `Potwierdź utworzenie zespołu za pomocą przycisku "Dodaj projekt".`,
    `Teraz możesz przejść do zarządzania nowym projektem, klikając w jego kartę.`,
  ],
};

export const instructionCreateProjectBoardColumns: IInstructionProps = {
  introduction: `Znajdujesz się aktualnie w widoku tablicy projektu. Tutaj możesz zarządzać swoimi zadaniami oraz z odpowiednimi uprawnieniami tworzyć i zarządzać wszystkimi zadaniami i kolumnami`,
  title: `Instrukcja utworzenia Kolumny`,
  steps: [
    `Otwórz formularz w prawym dolnym rogu.`,
    `Kliknij przycisk "Nowa kolumna".`,
    `Napisz nazwę, w przypadku kolumny nazwa powinna ona reprezentować proces lub postęp.`,
    `Ustaw wip, wip reprezentuje wartość ile powinno znajdować się zadań w niniejszej kolumnie. (wartość 0 nie ustawia licznika)`,
    `Potwierdź utworzenie zespołu za pomocą przycisku "Dodaj kolumne".`,
    `Teraz możesz przejść do dodania kolejnej kolumny lub dodawania zadań.`,
  ],
};

export const instructionCreateProjectBoardTasks: IInstructionProps = {
  title: `Instrukcja utworzenia zadania`,
  steps: [
    `Otwórz formularz w prawym dolnym rogu.`,
    `Kliknij przycisk "Nowe zadanie".`,
    `Napisz treść zadania. Treść powinna być ogólna i nie zawierać konkretów.`,
    `Ustaw kolor tekstu zadania.`,
    `Ustaw kolor tła zadania. Postaraj się tak wybrać kolory, żeby zadanie było czytelne.`,
    `Wybierz osobę odpowiedzialną za wykonanie tego zadania.`,
    `Ustaw termin wykonania zadania.`,
    `Teraz możesz zacząć pracę ze swoimi zadaniami.`,
  ],
};
