package Panchitos;//El componente concreto

import java.time.LocalDateTime;

public class Pancho implements Venta{
    private double valorBase;
    private String ticket;
    private String comprador;

    public Pancho(double valorBase, String comprador){
        this.valorBase = valorBase;
        ticket = "Ticket de la venta:"+
                "Realizada  el \n" + LocalDateTime.now() +
                "\nComprador: " + comprador +
                "\nValor Base: " + valorBase;
    }

    public double getValor(){
        return valorBase;
    }

    public String getTicket() {
        return ticket;
    }
}
