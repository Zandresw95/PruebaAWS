import React from "react";
import { Button } from 'primereact/button';
import { useSelector } from "react-redux";
function Home() {
  const { name, role } = useSelector((state) => state.auth);
  return (
    <div >
      <div className="grid justify-content-around align-items-center gap-8" style={{height: '100vh'}}>
        <Button className="p-button-rounded p-button-text ico-apadrinamiento" onClick={() => { }} />
        <Button className="p-button-rounded p-button-text ico-adopcion" onClick={() => { }} />
        <Button className="p-button-rounded p-button-text ico-donacion" onClick={() => { }} />
        <Button className="p-button-rounded p-button-text ico-fundaciones" onClick={() => { }} />
        <Button className="p-button-rounded p-button-text ico-usurio-nav" onClick={() => { }} />
        {(role == "P001") && <Button className="p-button-rounded p-button-text ico-administracion" onClick={() => { }} />}
      </div>
    </div>
  );
}

export default Home;