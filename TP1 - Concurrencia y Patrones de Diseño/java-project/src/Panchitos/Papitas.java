package Panchitos;

public class Papitas extends Extra{

    private double precio = 1.50;

    public Papitas(Venta unaVenta) {
        super(unaVenta);
    }

    public double getValor() {
        return super.getValor() + precio;
    }

    public String getTicket() {
        return super.getTicket() + "\nPapitas agregadas por un valor de: " + precio;
    }
}
