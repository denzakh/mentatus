# Этап 14 — Мобильное меню и переключение контента

**Статус:** 📝 в работе
**Зависимости:** нет
**Назначение:** Спецификация мобильной версии интерфейса с закрепленным нижним меню и переключением между разделами ввода и заключения

## Цель

Реализовать мобильный вариант интерфейса, где:
1. Левое меню (`app__menu`) превращается в фиксированное нижнее меню со скроллом
2. Рядом с меню появляется кнопка переключения между показом страниц ввода (`app__manager`) или заключения (`app__conclusion`)

## Что было до

Текущая десктопная раскладка в `src/containers/App/index.tsx`:
- Меню лево (`app__menu`) занимает фиксированную ширину
- Контент (`app__content`) распределен на две колонки: `app__manager` (ввод) и `app__conclusion` (заключение)
- Фиксированная ширина через `flex-basis`

## Что сделано

### 1. Мобильная версия нижнего меню

В мобильном представлении (`max-width: 768px`):
- Меню `app__menu` удаляется из основной потока flex-раскладки
- Добавляется как фиксированный элемент внизу экрана
- Меню имеет скролл при содержимом, превышающем высоту экрана
- Фон меню: `#f0f0f0` с легким тенью
- Высота меню: `80px` (или `calc(100% - 20px)` с учетом падингов)

### 2. Кнопка переключения

Рядом с меню (справа от него, или внутри если место есть):
- Кнопка `Toggle Section` с иконкой переключения
- При клике переключает отображение между:
  - `app__manager` — страницы ввода текущего раздела
  - `app__conclusion` — страница заключения
- Анимация переключения: `opacity 0.3s ease, transform 0.3s ease`
- Состояние хранится в `activeTab` (текущий открытый раздел)

### 3. Изменения в верстке

**src/containers/App/index.tsx:**
- Добавить `useState` для мобильного режима и переключения контента
- Условие отображения: при `width <= 768px` применяется мобильная раскладка
- Кнопка переключения между manager и conclusion

**src/containers/App/App.css:**
- Добавить правила для мобильного режима (`@media (max-width: 768px)`):
  - Скрыть `.app__menu` из потока `display: none` в мобильном, или перенести вниз
  - Создать `.app__menu-mobile` — фиксированное меню внизу
  - Создать `.app__toggle-btn` — кнопка переключения
  - Создать `.app__content-mobile` — контент с отступом снизу под меню

### 4. Поведение

| Элемент | Десктоп | Мобильный |
|---------|---------|-----------|
| `app__menu` | Левое меню, `flex: 70px 0 0` | Нижнее меню со скроллом, `position: fixed; bottom: 0; left: 0; right: 0; overflow-y: auto; height: 80px` |
| `app__manager` | Колонка ввода, `flex-grow: 2; flex-basis: 600px` | Основной контент под меню |
| `app__conclusion` | Колонка заключения, `flex-grow: 2; flex-basis: 400px` | Основной контент под меню |
| Кнопка переключения | Отсутствует или в шапке | Кнопка рядом с меню для переключения manager/conclusion |

### 5. Требования к реализации

1. **CSS/media queries**: Использовать `@media (max-width: 768px)` для переключения режимов
2. **Фиксированное меню**: `position: fixed; bottom: 0; left: 0; right: 0; overflow-y: auto; height: 80px; background: #f5f5f5; box-shadow: 0 -2px 5px rgba(0,0,0,0.1); z-index: 100;`
3. **Скролл меню**: Внутренний контент меню имеет `height: 100%; overflow-y: auto; padding: 10px;`
4. **Кнопка переключения**: `margin: 0 10px; padding: 8px 16px; background: #e0e0e0; border-radius: 20px; font-size: 12px; cursor: pointer; transition: background 0.2s;`
5. **Активное состояние кнопки**: `background: #b0b0b0` при наведении/фокусе
6. **Контентные области**: `margin-bottom: 80px;` в мобильном режиме, чтобы не налазило на меню
7. **Транзиции**: Все изменения интерфейса должны иметь плавные переходы `0.2s` ease

### 6. Пример структуры после изменений

```tsx
// index.tsx (упрощенно)
return (
  <div className="app">
    <div className="app__row">
      {/* Мобильное меню */}
      <nav className="app__menu app__menu-mobile">
        <div className="app__menu-title">Разделы</div>
        <TabMenu activeTab={activeTab} toggleTab={toggleTab} />
      </nav>
      
      {/* Кнопка переключения */}
      <button className="app__toggle-btn" onClick={toggleContent}>
        {showConclusion ? 'К вводу' : 'К заключению'}
      </button>
      
      {/* Контентная область */}
      <div className="app__content app__content-mobile">
        <main className="app__content-row">
          {showConclusion ? (
            <div className="app__conclusion">
              <Conclusion toggleTab={toggleTab} />
            </div>
          ) : (
            <div className="app__manager">
              <TabRender activeTab={activeTab} />
            </div>
          )}
        </main>
      </div>
    </div>
  </div>
)
```

### 7. Границы

- Не менять общую структуру десктопного режима (`min-width: 769px`)
- Изменения касаются только `@media (max-width: 768px)` блоков
- Сохранять обратную совместимость с существующими разделами
- Не ломать существующий функционал переключения вкладок

### 8. Проверка

```bash
CI=true npx react-scripts test --env=jsdom
npx react-scripts build
npx eslint src --ext .js,.jsx
```
Ожидание: 37 тестов зелёные, сборка `Compiled successfully`, линт без ошибок. additionally, manual testing on mobile viewport (Chrome DevTools, `ctrl+shift+m` или `F12` → режим устройства).

## План реализации

1. Добавить CSS правила для мобильного меню в `App.css`
2. Добавить кнопку переключения в `index.tsx`
3. Добавить media queries и класс `app__content-mobile`
4. Проверить поведение на уменьшенном viewport
5. Запустить тесты и линтинг