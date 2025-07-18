import { Card } from "../../card_data/card_data";
import {
    getSelectedCard,
    setSelectedCard,
    getCardsToCol,
} from "../../state/cardState";
import { validateMove } from "./validMove";
import { cancelMove } from "./cancelMove";
import { refreshDisplay } from "./refreshDisplay";
import { moveSelectedCards } from "./moveSelectedCards";

export const handleCardClick = (
    card: Card,
    colIndex: number,
    cardIndex: number,
    cardDiv: HTMLDivElement
) => {
    const selected = getSelectedCard();
    const cardstoCol = getCardsToCol();

    if (!selected) {
        setSelectedCard({ card, fromCol: colIndex, cardIndex });
        cardDiv.style.outline = "4px solid blue";
        return;
    }

    const toCol = cardstoCol[colIndex];
    const isCancel = cancelMove(selected.card, toCol[toCol.length - 1]);
    if (!isCancel) {
        console.log(
            "checking validatemove",
            selected.card,
            toCol[toCol.length - 1],
            toCol[toCol.length - 1].isFaceUp,
            toCol[toCol.length - 1].internalValue,
            toCol[toCol.length - 1].label,
            toCol[toCol.length - 1].colour,
            toCol[toCol.length - 1].suit
        );
        const isValid = validateMove(selected.card, toCol[toCol.length - 1]);
        console.log("after validatemove", isValid)
        if (!isValid) {
            alert(
                "Card must be dropped on opposite colour and one rank higher."
            );
            setSelectedCard(null);
            refreshDisplay();
            return;
        }
        moveSelectedCards(selected, colIndex);
    }
    else {
        setSelectedCard(null);
    }
    
    refreshDisplay();
};
