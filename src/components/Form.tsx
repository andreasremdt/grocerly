function Form() {
  return (
    <form>
      <input type="text" required />
      <input type="number" />
      <select>
        <option value="g">g (gram)</option>
        <option value="kg">kg (kilogram)</option>
        <option value="ml">ml (mililitres)</option>
        <option value="l">l (litres)</option>
        <option value="pieces">pieces</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
