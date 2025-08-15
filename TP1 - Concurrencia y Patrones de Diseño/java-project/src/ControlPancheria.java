import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import static java.util.concurrent.TimeUnit.*;


public class ControlPancheria {
    private final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(1);

    public void hacerPanchito() {
        final Runnable panchero = new Panchero();

        final ScheduledFuture<?> pancheriaAbierta =
                scheduler.scheduleWithFixedDelay(panchero, 0, 3, SECONDS);

        scheduler.schedule(new Runnable() {
            public void run() { pancheriaAbierta.cancel(true);
                System.out.println("Pancheria cerrada");
                scheduler.shutdown();
            }
        }, 30, SECONDS);
    }

}
