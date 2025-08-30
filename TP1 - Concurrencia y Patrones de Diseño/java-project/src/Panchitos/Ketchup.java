package Panchitos;

public class Ketchup extends Extra{

    private double precio = 0.75;

    public Ketchup(Venta unaVenta) {
        super(unaVenta);
    }

    public double getValor() {
        return super.getValor() + precio;
    }

    public String getTicket() {
        return super.getTicket() + "\nKetchup agregado por un valor de: " + precio;
    }
}
