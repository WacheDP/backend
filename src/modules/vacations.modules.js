import { pool } from "../database.js";

export const updateDETGROS = async (id, idvac, datos) => {
  const sebo = await one(idvac);

  const item = datos.item || sebo.item;
  const days = datos.days || sebo.days;
  const daily_rate = datos.daily_rate || sebo.daily_rate;
  const total = days * daily_rate;

  const grosspay = await pool.query(
    "update det_vac_grosspay set item=$1, days=$2, daily_rate=$3, total=$4 where id=$5 returning *",
    [item, days, daily_rate, total, id]
  );

  const total_gross = await pool.query(
    "select sum(total) as total from det_vac_grosspay where vacation=$1",
    [idvac]
  );

  const net_play = total_gross.rows[0].total - sebo;

  const vacation = await pool.query(
    "update vacations set gross_pay=$, net_pay=$, updated_at=current_timestamp where id=$ returning *",
    [total_gross.rows[0].total, net_pay, idvac]
  );
};

export const updateVAC = async (id, datos) => {
  const sebo = one(id);
  const vacation = sebo.vacation;

  const today = datos.today || vacation.today;
  const start = datos.start || vacation.start;
  const end = datos.end || vacation.end;
  const status = datos.status || vacation.status;

  const edit = await pool.query(
    'update vacations set today=$1, start=$2, "end"=$3, status=$4, updated_at=current_timestamp where id=$5 returning *',
    [today, start, end, status, id]
  );

  return edit.rows[0];
};

export const create = async (datos) => {
  const { employee, rate, start, end } = datos.vacation;

  const grosspay = () => {
    let total = 0;

    datos.grosspay.forEach((element) => {
      total += element.days * element.daily_rate;
    });

    return total;
  };

  const total_deduction = () => {
    let total = 0;

    datos.deduction.forEach((element) => {
      total += element.total;
    });

    return total;
  };

  const net_pay = grosspay() - total_deduction();

  const vacation = await pool.query(
    'insert into vacations(employee, rate, start, "end", gross_pay, total_deduction, net_pay) values ($1, $2, $3, $4, $5, $6, $7) returning *',
    [employee, rate, start, end, grosspay(), total_deduction(), net_pay]
  );

  const grosspayDetail = await gp_new(datos.grosspay, vacation.rows[0].id);
  const deductionDetail = await dd_new(datos.deduction, vacation.rows[0].id);

  return {
    vacation: vacation.rows[0],
    grosspay: grosspayDetail,
    deduction: deductionDetail,
  };
};

const gp_new = async (datos, vacation) => {
  let results = [];

  for (const element of datos) {
    const { item, days, daily_rate } = element;
    const total = days * daily_rate;

    const detail = await pool.query(
      "insert into det_vac_grosspay(vacation, item, days, daily_rate, total) values ($1, $2, $3, $4, $5) returning *",
      [vacation, item, days, daily_rate, total]
    );

    results.push(detail.rows[0]);
  }

  return results;
};

const dd_new = async (datos, vacation) => {
  let results = [];

  for (const element of datos) {
    const { item, total } = element;

    const detail = await pool.query(
      "insert into det_vac_deduction(vacation, item, total) values ($1, $2, $3) returning *",
      [vacation, item, total]
    );

    results.push(detail.rows[0]);
  }

  return results;
};

export const one = async (id) => {
  const result = await pool.query("select * from vacations where id=$1", [id]);
  const vacation = result.rows[0];

  const grosspay = await dg_find(vacation.id);
  const deduction = await dd_find(vacation.id);

  return { vacation, grosspay, deduction };
};

export const all = async () => {
  const result = await pool.query("select * from vacations");
  const vacations = result.rows;

  const json = await Promise.all(
    vacations.map(async (vacation) => {
      const grosspay = await dg_find(vacation.id);
      const deduction = await dd_find(vacation.id);
      return { vacation, grosspay, deduction };
    })
  );

  return json;
};

const dg_find = async (vacation) => {
  const grosspay = await pool.query(
    "select * from det_vac_grosspay where vacation=$1",
    [vacation]
  );

  return grosspay.rows;
};

const dd_find = async (vacation) => {
  const deduction = await pool.query(
    "select * from det_vac_deduction where vacation=$1",
    [vacation]
  );

  return deduction.rows;
};
