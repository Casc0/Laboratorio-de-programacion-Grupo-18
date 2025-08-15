package Panchitos;

public class Mayonesa extends Extra{

    private double precio = 0.50;

    public Mayonesa(Venta unaVenta) {
        super(unaVenta);
    }

    public double getValor() {
        return super.getValor() + precio;
    }

    public String getTicket() {
        return super.getTicket() + "\nMayonesa agregada por un valor de: " + precio;
    }
}
