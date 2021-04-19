export default function handleChoiceFactory(gameStateManage, mode, callback) {

    return function handleChoice(rowIndex, cellIndex) {
		if (gameStateManage.isCellFree(rowIndex, cellIndex)) {
			gameStateManage.setCell(rowIndex, cellIndex);
			callback();
		}
    }
}