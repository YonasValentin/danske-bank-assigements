async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

type ActivePage =
  | LoadingPage
  | ErrorPage
  | AccountsPage
  | InternationalPaymentsPage
  | SupportPage;

interface UserInformation {
  email: string;
  name: string;
}

interface LoadingPage {
  active: boolean;
  message?: string;
}

interface ErrorPage {
  appErrorMessage?: string;
  userErrorMessage?: string;
}

interface TheNetbank {
  loggedIn?: UserInformation;
  activePage: ActivePage;
  chatWindow: ChatWindow;
}

enum LocalAccountCurrency {
  Dkk = 'DKK',
}

interface RegularAccount {
  name: string;
  iban: string;
  localCurrency: LocalAccountCurrency.Dkk;
  amount: number;
}

enum PocketAccountCurrency {
  Sek = 'SEK',
  Nok = 'NOK',
  Usd = 'USD',
  Eur = 'EUR',
}

interface PocketAccount {
  name: string;
  iban: string;
  pocket: {
    amount: number;
    currency: PocketAccountCurrency;
  }[];
}

type RegularAccountArray = [RegularAccount, ...RegularAccount[]];

interface AccountsPage {
  regularAccount: RegularAccountArray;
  pocketAccount?: PocketAccount[];
}

type TransferResult =
  | {
      details: any;
      time: Date;
      success: true;
    }
  | {
      message: string;
      success: false;
    };

interface InternationalPaymentsPage {
  iban: {
    input: string;
    active: boolean;
    valid: boolean;
  };
  swift: {
    input: number;
    active: boolean;
    valid: boolean;
  };
  theFromAccount: {
    regularAccount: string[];
    pocketAccount: {
      pocket: {
        currency: PocketAccountCurrency;
      }[];
    }[];
  };
  amount: {
    input: number;
    valid: boolean;
  };
  transfer: TransferResult;
}

enum ChatWindowSize {
  Minimized = 'minimized',
  Open = 'open',
  FullScreen = 'full-screen',
}

interface ChatMessage {
  name: string;
  message: string;
  timeSent: Date;
}

interface ChatConnected {
  messagesThread: ChatMessage[];
  currentMessage: string;
}

interface ChatInQueue {
  numberInQueue: number;
}

interface ChatDisconnected {
  leastBusyTimes: Date[];
}

interface ChatWindow {
  startChat(): void;
  chatResult: ChatResult;
}

type ChatResult = ChatConnected | ChatInQueue | ChatDisconnected;

interface SupportPage {
  chatWindow: ChatWindowSize.FullScreen;
}
