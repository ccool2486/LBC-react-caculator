/**
 * ---Components---
 *  1. 顯示現在數字
 *  2. 按鈕區
 *  3. 每個按鈕
 * 
 * ---邏輯---
 *  # 把現在顯示數字，點了什麼，下一個要運算的，都放在state
 *  # 當點擊的時候，會更新state
 *  # 更新state時，會呼叫caculate.js:
 *  # TRICK: Calculate會吃現在的state，並且利用條件，去計算回傳的OBJ
 *  # 利用更新的OBJ，去setState
 */