package Panchitos;//El componente concreto

import java.time.LocalDateTime;

public class Pancho implements Venta{
    private double valorBase;
    private String ticket;
    private String comprador;

    public Pancho(double valorBase, String comprador){
        this.valorBase = valorBase;
        ticket = "Ticket de la venta:"+
                "\nRealizada  el " + LocalDateTime.now() +
                "\nComprador: " + comprador +
                "\nValor Base: " + valorBase;
    }

    @Override
    public double getValor(){
        return valorBase;
    }
    
    @Override
    public String getTicket() {
        return ticket;
    }
}
