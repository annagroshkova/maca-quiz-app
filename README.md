# 🦍 React TS - Quiz App

I denna uppgift kommer ni att bygga en mobile first quiz-applikation. "Mobile first" innebär att man designar och stylar med en mobilskärms storlek som utgångspunkt. Designen ska fortfarande vara responsiv för alla skärmstolekar. Ni kommer jobba i sprints om 14 dagar, skapa ett system med tickets för varje enskild uppgift och kunna jobba relativt enskilt med era egna branches men samtidigt ha full koll på vem i gruppen som gör vad och vad som återstår att göra.

## 📦 Leverabler

1. En quiz-app som utvecklats så långt ni realistiskt hinner med under gällande period
2. En kanban board med tickets som tilldelats till rätt personer och flyttats till rätt kolumner baserat på status
3. En renskriven logg

## 🎯 Delmål

## 🖼️ 1. Välj ut en design

- [ ] **Genomförd**

Ni har fria händer vad gäller design. Nedan finns två exempel:

[Designexempel 1](https://dribbble.com/shots/19036723-Quiz-mobile-app-concept)

[Designexempel 2](https://dribbble.com/shots/25565149-Quizo-Quiz-Mobile-App)

### Appen ska också fungera på desktop/stora skrämar. Skifta mellan stor skärm och mobilvy för att säkerställa att stylingen täcker båda fall

### Tips 1

Börja smått med ett par kategorier av frågor där spelaren kryssar i ett av flera svarsalternativ. Bygg sedan vidare med fritext, multiple choice, tidsbegränsningar per fråga, versus mode etc.

## 2. 🧑‍🔬 Förberedelser

- [ ] **Genomförd**

1. Skapa ett nytt React-projekt - `npm create vite@latest my-react-app -- --template react-ts`

   - Byt ut `my-react-app` mot projektets faktiska namn

2. Bestäm vilka dependencies som ska användas. Utnyttja Reacts ekosystem av tredjepartsbibliotek. Använd färdiga UI-komponenter från exempelvis [shadcn](https://ui.shadcn.com/), förbättra det visuella och användarupplevelsen med t.ex. [motion](https://motion.dev/) eller [dnd kit](https://dndkit.com/), underlätta logiktunga uppgifter med bilbiotek som [lodash](https://lodash.com/) etc.

   - Kanske finns det redan NPM-paket specifikt för quiz-applikationer? Säkerställ att paketet har många nedladdningar, fortfarande underhålls och att uppdateringar har publicerats relativt nyligen. Då är paketet troligtvis relevant och säkert att använda.

### Tips 2

Om ni jobbar med formulär är det bäst att installera ett bibliotek som hanterar detta, då formulärhantering i React kan vara något knepigare än vad ni är vana vid. En stark rekommendation är att använda TanStack Form - `@tanstack/react-form`. Det är väldigt snabbt och smidigt att [konfigurera med hjälp av deras guide](https://tanstack.com/form/latest/docs/overview) som innehåller tydliga kodexempel.

## 3. Strukturera era sprints

- [ ] **Genomförd**

### För sprintledaren

1. Skapa ett Trello-konto och sätt upp en enkel Kanban board
2. Bjud in resten av gruppen och gå igenom grunderna i Kanban

   - Jobba i 14-dagarssprints
   - Börja varje sprint med planering - Dra in tickets från "backlog" till "todo".
   - Förklara verifieringssteget - Jobba med branches, pull requests, code review etc.
   - Synka hela gruppen tillsammans 1-2 gånger i veckan
   - Ha en sprintsummering på slutet av varje 14-dagarsperiod. Retros och andra ceremonier är valfria, men gå alltid igenom nya, mergade ändringar, förbättringar samt eventuella buggar

### För övriga gruppmedlemamar

1. Håll er första sprint planning och skapa relevanta tickets tillsammans.

   - Om det blir överkurs att introducera epics _och_ stories så räcker det med bara stories/tickets

2. Bestäm en rutin för hur ni ska hantera pull requests och code reviews

   - Jobba med nya branches för varje ticket
   - Skapa alltid en ny branch efter att du mergat in i main
   - Reviewa varandras pull requests. Alla behöver inte titta på allt, men 1-2 personer ska titta igenom och godkänna innan något mergas till main.

3. Ta hjälp av varandra

   - Kombinera era olika kunskaper och dela dem med varandra för bästa möjliga resultat

### Nu har ni allt som behövs för att börja jobba på ert quiz-projekt! 🎉

## 4. För en kontinuerlig logg

Varje individ ska föra en log för varje sprint. Skriv kort ned några svar på följande frågor:

- Vad har jag lärt mig denna sprint?
- Vilka problem har jag stött på?
- Vad kan jag göra bättre till nästa sprint?
- Vad gör jag nu som jag inte gjorde förra sprinten (Både positivt och negativt)?

### Inför sista fredagen av detta projekt

Renskriv dina anteckningar och summera dem till en kort och koncis punktlista med de viktigaste insikterna. Detta kommer var och en att redovisa på slutet.
