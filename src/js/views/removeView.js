class Rem {
  _el = document.querySelector('.message');
  _frmEl = document.querySelector('.upload');
  rem() {
    if (this._frmEl) {
      console.log(this._frmEl);
      console.log(this._frmEl.firstChild);
      console.log(this._el);
      this._el.remove();
      this._frmEl.removeChild(this._frmEl.lastChild);
    }
  }
}

export default new Rem();
