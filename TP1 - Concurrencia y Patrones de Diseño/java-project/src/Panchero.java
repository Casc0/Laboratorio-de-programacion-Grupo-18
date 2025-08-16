import Panchitos.*;
import java.util.Random;
import java.util.concurrent.BlockingQueue;

public class Panchero implements Runnable{
    private final Random random = new Random();
    private final BlockingQueue<String> colaClientes;

    public Panchero(BlockingQueue<String> colaClientes) { //Cada panchero tiene acceso a la cola de clientes
        this.colaClientes = colaClientes;
    }

    @Override
    public void run() {
        try {
            String comprador;
            while((comprador = colaClientes.poll())!=null){
                Venta pancho = new Pancho(3,comprador);
                System.out.println("Panchero: Preparando un panchito para " + comprador + "...");

                while (random.nextInt(3) != 0) { // Agrego toppings aleatorios
                    pancho = elegirTopping(pancho);
                    Thread.sleep(400);
                }

                System.out.println("Panchero: Panchito listo!\n");
                System.out.println("----------------------------");
                System.out.println(pancho.getTicket());
                System.out.println("Precio Final: " + pancho.getValor());
                System.out.println("---------------------------");
            }
        } catch (Exception e) {
            Thread.currentThread().interrupt();
        }
       
    }

    public Venta elegirTopping(Venta pancho){
        int ingrediente = random.nextInt(3); //Reutilizo el mismo random final 

        switch(ingrediente) {
            case 0:
                pancho = new Ketchup(pancho);
                break;
            case 1:
                pancho = new Mayonesa(pancho);
                break;
            case 2:
                pancho = new Papitas(pancho);
                break;
        }
        return pancho;
    }
}
